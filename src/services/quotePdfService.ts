import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateQuotePdf = (quote: any) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  const filePath = path.join(__dirname, `../../pdfs/quote_${quote._id}.pdf`);

  // Caminho do arquivo PDF
  const dirPath = path.join(__dirname, '../../pdfs');

  // Verificar se o diretório existe, se não, criar
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(filePath));

  // Adicionar informações da empresaa
  doc.fontSize(12).text(quote.company.name, { align: 'center' });
  doc.text(`CNPJ: ${quote.company.cnpj}`);
  doc.text(`Endereço: ${quote.company.address}`);
  doc.text(`Telefone: ${quote.company.phone}`);
  doc.text(`Email: ${quote.company.email}`);

  doc.moveDown();

  doc.fontSize(18).text('Orçamento', { align: 'center' });

  doc.moveDown();

     // Dados do cliente
  doc.fontSize(12).text(`Cliente: ${quote.clientName}`, { align: 'left' });
  doc.text(`Email: ${quote.clientEmail}`, { align: 'left' });
  doc.text(`Telefone: ${quote.clientPhone}`, { align: 'left' });

  doc.text(`Descrição do Serviço: ${quote.serviceDescription}`, { align: 'left' });
  doc.text(`Tempo Estimado: ${quote.estimatedTime}`, { align: 'left' });

  doc.text(`\n`);

  // Tabela de serviços
  doc.text('Serviços:', { underline: true });

  const serviceData = quote.items.map((item: any) => [
    item.serviceName,
    item.quantity,
    `R$ ${item.unitPrice.toFixed(2)}`,
    `R$ ${(item.unitPrice * item.quantity).toFixed(2)}`,
  ]);

  // Desenhando a tabela manualmente
  const tableStartY = doc.y;
  const marginLeft = 50;
  const columnWidths = [250, 100, 100, 100];
  const rowHeight = 20;

  // Desenhando cabeçalho da tabela
  doc.fontSize(10)
    .text('Serviço', marginLeft, tableStartY)
    .text('Quantidade', marginLeft + columnWidths[0], tableStartY)
    .text('Preço Unitário', marginLeft + columnWidths[0] + columnWidths[1], tableStartY)
    .text('Total', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2], tableStartY);

  // Desenhando as linhas da tabela
  let currentY = tableStartY + rowHeight;
  serviceData.forEach((row: string[]) => {
    doc.text(row[0], marginLeft, currentY)
      .text(row[1], marginLeft + columnWidths[0], currentY)
      .text(row[2], marginLeft + columnWidths[0] + columnWidths[1], currentY)
      .text(row[3], marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2], currentY);

    currentY += rowHeight;
  });

  doc.text(`\n`);

  // Subtotal, Desconto e Total
  const dataStartY = currentY + rowHeight;

  doc.text(`Subtotal: R$ ${quote.subtotal.toFixed(2)}`, marginLeft, dataStartY);
  doc.text(`Desconto: R$ ${(quote.subtotal * (quote.discount / 100)).toFixed(2)}`, marginLeft, dataStartY + rowHeight);
  doc.text(`Valor Total: R$ ${quote.total.toFixed(2)}`, marginLeft, dataStartY + rowHeight * 2);

  // Formas de pagamento e Condições de pagamento
  doc.text(`Formas de Pagamento: ${quote.paymentMethods.join(', ')}`, marginLeft, dataStartY + rowHeight * 3);
  doc.text(`Condições de Pagamento: ${quote.paymentConditions}`, marginLeft, dataStartY + rowHeight * 4);

  // Finalizar o PDF
  doc.end();

  return filePath;
};
