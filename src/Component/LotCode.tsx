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
  const [csvdata, Setcsvdata] = useState<string>('');
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
      const Blank:APIDQC892 ={
        Status: false,
        Data: [],
        Note: "string" 
      }
      setDatas(Blank);
      const response = await axios.post(
        'http://m21100400012002.mamfg.calcomp.co.th:7079/api/ING/DQC892',
        SN
      );
      if(response.data){
        setDatas(response.data);
      }
      console.log(datas);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

 

  function exportToCsv(csvString:string) {
   
    if(csvString.length > 0){
       // Creating a Blob and generating a data URL
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const filename = Date.now();
      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename+'.csv';
      link.click();
    
      // Clean up the created URL
      URL.revokeObjectURL(url);
    }
  }

  const DownloadCsv = async () => {
    try {
      const response = await axios.post(
        'http://m21100400012002.mamfg.calcomp.co.th:7079/api/Download/DownloadPcbDetail',
        SN
      );
      Setcsvdata(response.data)
      exportToCsv(csvdata);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  // Function to export data to CSV


  const handleKeyDownLocal = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (e.g., new line in textarea)
      console.log(locationMat);
        if(locationMat.length > 0&&localMessage.length >=9){
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
              <Table   className="tbodyTable">
                <thead>
                  <tr>
                  <th>#</th>
                  <th>TRANS_NO</th>
                  <th>MO_SN</th>
                  <th>SITE_CODE</th>
                  <th>LOAD_DT</th>
                  <th>INSP_DT</th>
                  <th>LINE_NO</th>
                  <th>ASSY_PN</th>
                  <th>ASSY_REV</th>
                  <th>DA</th>
                  <th>SON_PN</th>
                  <th>SUPPLIER_CODE</th>
                  <th>LOT_CD</th>
                  <th>DATE_CODE</th>
                  <th>LOAD_QTY</th>
                  <th>QTY</th>
                  <th>LOCATION</th>
                  <th>LAST_UPD</th>
                  </tr>
                </thead>
                <tbody>
                {(datas?.Status !== false && datas !== undefined) ? datas?.Data.map((item,idx) =>( 
                  <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.TRANS_NO}</td>
                        <td>{item.MO_SN}</td>
                        <td>{item.SITE_CODE}</td>
                        <td>{(item.LOAD_DT) ? format(new Date(item.LOAD_DT), 'yyyy-MM-dd HH:mm:ss') : ""}</td>
                        <td>{format(new Date(item.INSP_DT), 'yyyy-MM-dd HH:mm:ss')}</td>
                        <td>{item.LINE_NO}</td>
                        <td>{item.ASSY_PN}</td>
                        <td>{item.ASSY_REV}</td>
                        <td>{item.DA}</td>
                        <td>{item.SON_PN}</td>
                        <td>{item.SUPPLIER_CODE}</td>
                        <td>{item.LOT_CD}</td>
                        <td>{item.DATE_CODE}</td>
                        <td>{item.LOAD_QTY}</td>
                        <td>{item.QTY}</td>
                        <td>{item.LOCATION}</td>
                        <td>{format(new Date(item.LAST_UPD), 'yyyy-MM-dd HH:mm:ss')}</td>
                  </tr>
                )): <tr></tr>}
                </tbody>
              </Table>
            </div>
            <div  className="itemInput">
              {(datas) ? <button className="btnExport" onClick={DownloadCsv}>Export</button>: null}
            </div>
        </div>
    </>
  );
};

export default LotCode;
