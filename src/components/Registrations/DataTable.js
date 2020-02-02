import React from 'react';

const DataTable = ({ registrations }) => (
  <table className="table mb-0">
    <thead className="bg-light">
      <tr>
        <th scope="col" className="border-0">
          #
        </th>
        <th scope="col" className="border-0">
          ชื่อ-สกุล
        </th>
        <th scope="col" className="border-0">
          อายุ
        </th>
        <th scope="col" className="border-0">
          เลขบัตรประชาชน
        </th>
        <th scope="col" className="border-0">
          เบอร์ติดต่อผู้ป่วย
        </th>
        <th scope="col" className="border-0">
          วินิจฉัยโรคล่าสุด
        </th>
        <th scope="col" className="border-0">
          วันที่เริ่มวินิจฉัย
        </th>
        <th scope="col" className="border-0">
          รพ.แม่ข่ายที่ D/C
        </th>
        <th scope="col" className="border-0">
          วันที่ D/C
        </th>
        <th scope="col" className="border-0">
          PCU ที่รับดูแล
        </th>
        <th scope="col" className="border-0">
          วันที่รับ Case
        </th>
        <th scope="col" className="border-0">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {registrations.map(regis => (
        <tr key={regis.id}>
          <td>{regis.id}</td>
          <td>{regis.name}</td>
          <td>{regis.age}</td>
          <td>{regis.cid}</td>
          <td>{regis.tel}</td>
          <td>{regis.dx}</td>
          <td>{regis.dxDate}</td>
          <td>{regis.dchHosp}</td>
          <td>{regis.dchDate}</td>
          <td>{regis.pcu}</td>
          <td>{regis.regDate}</td>
          <td className="text-center">
            <i className="material-icons">edit</i>
            <i className="material-icons">delete</i>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
