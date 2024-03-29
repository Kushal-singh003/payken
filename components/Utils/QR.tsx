import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import QRCodeStyling from "qr-code-styling";
// const inter = Inter({ subsets: ['latin'] })
import { useState,useRef,useEffect } from 'react';

export default function QRCode({props}) {
console.log(props,'props')
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    image:
      "/img/payken-qr.png",
    dotsOptions: {
      color:"rgb(1 23 4)",
      type: "rounded"
    },
   
    imageOptions: {
      crossOrigin: "anonymous",
      margin:6
    }
  });
  const [url, setUrl] = useState(props);
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);
  const [showText,setShowText] = useState(false);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  function copyTextFn() {
    // console.log(props,'prsp')
    // navigator.clipboard.writeText(props);

    const textArea = document.createElement("textarea");
    textArea.value = props;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);


    setShowText(true);

    setTimeout(() => {
      setShowText(false);
    }, [1000]);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div ref={ref} />
      <div style={{marginTop:'1rem'}} className="App qr-app">
      {/* <div style={styles.inputWrapper}> */}
        <div className='qrDIv'>

        <input style={{padding:'8px 10px',width:'60% '}} className='qr-input' value={url} onChange={onUrlChange}  />
        <select style={{padding:'11px 10px',marginLeft:'1rem',width:'20% '}}  className='qr-select' onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        </div>

        <div className='copyDiv'>

        <button className='downloadQR' onClick={copyTextFn}>{showText ? 'Copied' : 'Copy'}</button>

        <button className='downloadQR' onClick={onDownloadClick}>Download</button>
        </div>
      </div>
    {/* </div> */}
    </>
  )
}
