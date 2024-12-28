import React from 'react';
import { Packer, Document, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './FileWord.css';

const FileWord = ({ chartProduct, startDate, endDate }) => {
  const exportToWord = () => {
    // Tạo phần tiêu đề
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Kết quả cho thấy:'),
              ],
            }),
            // Nếu có startDate và endDate, thêm phần giới thiệu ngày tháng
            startDate && endDate ? new Paragraph({
              children: [
                new TextRun(`Từ ngày ${startDate} đến ${endDate}`),
              ],
            }) : null,
            // Tạo các mục cho mỗi sản phẩm
            ...chartProduct.map(item => (
              new Paragraph({
                children: [
                  new TextRun(`Sản phẩm ${item.name}:`),
                  new TextRun(`\nĐã được đặt với số lượng ${item.totalQuantity},`),
                  new TextRun(`\nVới doanh thu từ sản phẩm này là ${item.totalValue}.000 vnđ`),
                ],
              })
            )),
          ],
        },
      ],
    });

    // Chuyển đổi thành blob và tải về file Word
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'ket_qua_san_pham.docx');
      console.log('Document created successfully');
    });
  };

  return (
    <div className='contain-word'>
      <div className='result'>
        <h2>Kết quả cho thấy:</h2>
        {startDate && endDate ? (
          <div>từ ngày {startDate} đến {endDate}</div>
        ) : null}
        <ul className='list-result'>
          {chartProduct.map((item, index) => (
            <li className='item-result' key={index}>
              Sản phẩm {item.name} :
              <br /> đã được đặt với số lượng {item.totalQuantity},
              <br /> với doanh thu từ sản phẩm này là {item.totalValue}.000 vnđ
            </li>
          ))}
        </ul>
        
      </div>
      <button className='btn-word' onClick={exportToWord}>Tải về File Word</button>
    </div>
  );
};

export default FileWord;
