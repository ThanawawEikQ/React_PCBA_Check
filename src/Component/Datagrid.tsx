import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DQC342 from '../Prop/DQC342';
import PCBLOG from '../Prop/PCBATEST'
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns'; 
import TextField from '@mui/material/TextField';


const Datagrid: React.FC = () => {
  const [datas, setDatas] = useState<DQC342[]>([]);
  const [dataLog, setDataLog] = useState<PCBLOG[]>([]);
  const [localMessage, setLocalMessage] = useState<string>('');

  const SN = {
    serId: localMessage,
    mode: 0
  };

  const Logtest = {
    serId: localMessage,
    mode: 0
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        'http://m21100400012002.mamfg.calcomp.co.th:7079/api/ING/DQC342',
        SN
      );
      setDatas(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  const postLogTest = async () => {
    try {
      const response = await axios.post(
        'http://m21100400012002.mamfg.calcomp.co.th:7079/api/ING/PCBALOG',
        Logtest
      );
      setDataLog(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMessage(event.target.value);
    console.log(localMessage);
      if(localMessage.length == 9){
        setLocalMessage(event.target.value);
         postData();
         postLogTest();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (e.g., new line in textarea)
      console.log(localMessage);
        if(localMessage.length == 9){
          postData();
          postLogTest();
      }
    }
};

  return (
    <>
      <div className="formInput">
            <div className="itemInput">
                <h1>SCAN PCBA</h1>
            </div>
            <div className="itemInput">
                <TextField fullWidth  
                value={localMessage} 
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                 color="success" id="filled-basic" label="SN PCBA" variant="filled"  />
            </div>
            <div className="itemInput">
              <Table responsive  className="tbodyTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PCBSN</th>
                    <th>JoNo</th>
                    <th>Model</th>
                    <th>LineNo</th>
                    <th>Station</th>
                    <th>DefItem</th>
                    <th>TestDttm</th>
                    <th>LastUpd</th>
                    <th>SummonsNumber</th>
                    <th>Uid1</th>
                    <th>ProdType</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.SerSn}</td>
                      <td>{item.JoNo}</td>
                      <td>{item.Model}</td>
                      <td>{item.LineNo}</td>
                      <td>{item.Station}</td>
                      <td>{item.DefItem}</td>
                      <td>{format(new Date(item.TestDttm), 'yyyy-MM-dd HH:mm:ss')}</td>
                      <td>{format(new Date(item.LastUpd), 'yyyy-MM-dd HH:mm:ss')}</td>
                      <td>{item.SummonsNumber}</td>
                      <td>{item.Uid1}</td>
                      <td>{item.ProdType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="itemInput">
            <Table responsive  className="tbodyTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PCBSN</th>
                    <th>SummonNumber</th>
                    <th>Status</th>
                    <th>MachineID</th>
                    <th>FullMode</th>
                    <th>LastUpd</th>
                    <th>DetailValues</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLog.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.SerialNumber}</td>
                      <td>{item.SummonsNumber}</td>
                      <td>{item.Status}</td>
                      <td>{item.MachineID}</td>
                      <td>{item.FullMode}</td>
                      <td>{format(new Date(item.LastUpd), 'yyyy-MM-dd HH:mm:ss')}</td>
                      <td>{item.DetailValues}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>          
            </div>
        </div>
      
    </>
  );
};

export default Datagrid;
