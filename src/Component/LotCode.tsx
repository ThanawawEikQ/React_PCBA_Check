import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { DQC892 } from '../Prop/DQC892';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns'; 
import TextField from '@mui/material/TextField';

interface APIDQC892{
  Status: boolean;
  Data: DQC892[];
  Note: string;
}


const LotCode: React.FC = () => {
  const [datas, setDatas] = useState<APIDQC892>();
  const [localMessage, setLocalMessage] = useState<string>('');
  const [locationMat, SetLocation] = useState<string>('');

  const SN = {
    sn: localMessage,
    locaion: locationMat
  };



  const postData = async () => {
    try {
      console.log(SN);
      const response = await axios.post(
        'http://m21100400012002.mamfg.calcomp.co.th:7079/api/ING/DQC892',
        SN
      );
      setDatas(response.data);
      console.log(datas);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleKeyDownLocal = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (e.g., new line in textarea)
      console.log(locationMat);
        if(locationMat.length > 0){
          postData();
      }
    }
  };


  return (
    <>
      <div className="formInput">
            <div className="itemInput">
                <h1>SCAN PCBA AND LOCATION</h1>
            </div>
            <div className="itemInput">
                <TextField fullWidth  
                value={localMessage} 
                onChange={(e)=> setLocalMessage(e.target.value)}
                 color="success" id="filled-basic" label="SN PCBA" variant="filled"  />
                <TextField fullWidth  
                value={locationMat} 
                onChange={(e)=> SetLocation(e.target.value)}
                onKeyDown={handleKeyDownLocal}
                 color="success" id="filled-basic" label="SN LOCATION" variant="filled"  />
            </div>
            <div className="itemInput">
              <Table responsive  className="tbodyTable">
                <thead>
                  <tr>
                  <th>#</th>
                  <th>TRANS_NO</th>
                  <th>MO_SN</th>
                  <th>SITE_CODE</th>
                  <th>LINE_NO</th>
                  <th>ASSY_PN</th>
                  <th>DA</th>
                  <th>LOAD_DT</th>
                  <th>LAST_UPD</th>
                  <th>SON_PN</th>
                  <th>ASSY_REV</th>
                  </tr>
                </thead>
                <tbody>
                {datas?.Data.map((item,idx) =>( 
                  <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.TRANS_NO}</td>
                        <td>{item.MO_SN}</td>
                        <td>{item.SITE_CODE}</td>
                        <td>{item.LINE_NO}</td>
                        <td>{item.ASSY_PN}</td>
                        <td>{item.DA}</td>
                        <td>{format(new Date(item.LOAD_DT), 'yyyy-MM-dd HH:mm:ss')}</td>
                        <td>{format(new Date(item.LAST_UPD), 'yyyy-MM-dd HH:mm:ss')}</td>
                        <td>{item.SON_PN}</td>
                        <td>{item.ASSY_REV}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </div>
        </div>
      
    </>
  );
};

export default LotCode;
