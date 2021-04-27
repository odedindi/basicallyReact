import React, { useState } from 'react';
// ======================== style ====================================
import {GrDocumentCsv} from 'react-icons/gr';
import './index.css';
// ===================================================================
// ======================== stores and backend =======================
import { getFile, postData } from '../../store/fetches/asyncFetches';
import { baseUrlServer } from '../../store/constants';
// ===================================================================

const voltageProfileDownload = () => {

    const [email, setEmail] = useState('');
    const [ showMessage, setShowMessage ] = useState(false);

    const downloadHandler = () => {
      getFile(`${baseUrlServer}voltageprofile/download.csv`)
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = 'voltage-profile.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('oh no!'));
    };

    const emailHandler = (e) => {
        e.preventDefault();
        const body = { email: email }

        postData(`${baseUrlServer}touchvoltage/email.csv`, body)
        .then(response => {
            if (response.ok) {
                setShowMessage(true);
                setEmail('');
            } else console.log('oh no!');
        });
    };
    const message = 'Email has been sent';

    return (
        <div id="download-wrapper">
            <div id="pdf-header">
                <GrDocumentCsv id="pdf-icon"/>
                <h1>Get voltage profile as CSV</h1>
            </div>
            <div id="download-button">
                <button className="custom-button" onClick={downloadHandler} >Download</button>
            </div>
            <form id="email-form"  onSubmit={emailHandler}>
                <input className="custom-input"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={ showMessage ? message : "Enter email" } />
                <button className="custom-button" type="submit">Send to email</button>
            </form>
        </div>
    );
};

export default voltageProfileDownload;