
import React from 'react';
import {Document, Page,Text, StyleSheet, View} from '@react-pdf/renderer';
import {PDFDownloadLink} from '@react-pdf/renderer';
import App from './../App';


class DownloadButton extends React.Component {

render(){
const GeneratePdf = () => (
<div>
<PDFDownloadLink document={<App />} fileName="somename.pdf">
{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>
</div>
)
return(
<div>
<h4>
{<GeneratePdf />}
</h4>
</div>
);
}
}
export default DownloadButton