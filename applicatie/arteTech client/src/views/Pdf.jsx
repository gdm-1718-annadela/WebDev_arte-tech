import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import React, { useState, useEffect, Component } from 'react';

const myPdf = () => (
  <div>
  <Document>
    <Page size="A4" >
      <View>
        <Text>Section #1</Text>
      </View>
      <View>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  </div>
)
  
export default myPdf;
  // Create Document Component
