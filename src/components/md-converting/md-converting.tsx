import React from "react";
import ReactMarkdown from 'react-markdown';

interface MdConvertingProps {
    markdown: string;
  }
  
  const MdConverting: React.FC<MdConvertingProps> = ({ markdown }) => {
    return <ReactMarkdown>{markdown}</ReactMarkdown>;
  };
  
  export default MdConverting;