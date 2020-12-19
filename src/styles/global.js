import 'bootstrap/dist/css/bootstrap.min.css';
import '~/styles/material-design-iconic-font/css/materialdesignicons.min.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalVars = {
  baseDIR: 'https://hi.isaquecosta.com.br/',

  color: {
    black: '#000000',
    grey: '#989898',
    white: '#FFFFFF',

    info: '#1976d2',
    danger: '#ee3c47',
    success: '#28a745',
    warning: '#ffb22b',
    athenas: '#f36700',

    quinzel: '#a42ef3',

    dark: '#4d3755',
    light: '#f5f1e5',
    transparent: 'transparent',
  },

  img: {
    logo_b: require('~/img/logo-b.png'),
    logo_w: require('~/img/logo-w.png'),
    favicon: require('~/img/favicon.png'),
    background: require('~/img/fastfoodbg.jpg'),
  },
};

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700");

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  a, select, button {
    cursor: pointer;
  }

  html, body {
    width: 100%;
    height: 100%;
    padding: 0 !important;
    -webkit-font-smoothing: antialiased;
    background-color: ${GlobalVars.color.light};
    background: url(${GlobalVars.img.background});
  }

  #root {
    width: 100%;
    padding: 25px;
    min-height: 100%;
    background-color: #ffffffdf;
  }

  body, label, input, button {
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    color: ${GlobalVars.color.dark};
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #4d375514;
  }

  td {
    font-weight: bold;
    border: none !important;
    padding: .25rem !important;
    vertical-align: middle !important;
    color: ${GlobalVars.color.grey};
  }
  td.qtd {
    width: 110px;
    font-size: 150%;
    font-weight: bold;
    text-align: right;
    color: ${GlobalVars.color.info};
  }
  td pre {
    font-size: 105%;
    font-family: 'Poppins', sans-serif;
    color: ${GlobalVars.color.athenas};
  }
  
  /*################## Colors ##################*/
  .text-black				{	color: #636363!important;	}
  .text-white				{ color: #FFFFFF!important; }
  .text-muted				{ color: #99abb4!important; }
  .text-primary			{ color: #0035ff!important; }
  .text-danger			{	color: #ee3c47!important;	}
  .text-athenas			{ color: #f36700!important; }
  .text-warning			{ color: #ffb22b!important; }
  .text-success			{ color: #28a745!important; }
  .text-info				{ color: #1976d2!important; }
  .text-quinzel			{ color: #800080!important; }
  .text-themecolor	{ color: #5292b1!important; }
  .text-breadcrumb	{	color: #455a64!important;	}

  .hi_bg-muted		  {background-color: #636363;}
  .hi_bg-default		{color: #5292b1!important;  background-color: white !important;   border-color: #5292b1 !important;}
  .hi_bg-themecolor	{color: white!important;    background-color: #5292b1!important;  border-color: #5292b1 !important;}
  .hi_bg-primary		{color: white!important;    background-color: #1976d2!important;}
  .hi_bg-info			  {color: white!important;    background-color: #1976d2!important;}
  .hi_bg-success		{color: white!important;    background-color: #28a745!important;}
  .hi_bg-warning		{color: black!important;    background-color: #ffb22b!important;}
  .hi_bg-danger		  {color: white!important;    background-color: #ee3c47!important;}
  .hi_bg-athenas		{color: white!important;    background-color: #f36700!important;}
  /*################## Card Styles ##################*/
  .card {
    cursor: pointer;
  }
  .breadcrumb {
    color: ${GlobalVars.color.white};
    font-size: 150%;
    font-weight: bold;
    background: ${GlobalVars.color.danger};
  }
   .card-header {
    color: ${GlobalVars.color.black};
    font-size: 150%;
    font-weight: bold;
  }

  .card-pObservacoes {
    margin: 0 .2rem 1rem;
    font-weight: 600;
    text-align: justify;
    color: ${GlobalVars.color.athenas};

    display: flex!important;
    justify-content: space-between!important;
  }

  .toggle-config {
    right: 1rem;
    bottom: 1rem;
    position: fixed;
    font-weight: 600;
    border-radius: 100%;
    background: ${GlobalVars.color.info};
  }

  .slimScrollDiv::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: .6rem;
    background-color: #FFF;
    border-radius: calc(.25rem - 1px)
  }

  .slimScrollDiv::-webkit-scrollbar-track,
  body::-webkit-scrollbar-track {
    border-radius: 0 calc(.25rem - 1px) calc(.25rem - 1px) 0;
  }

  .slimScrollDiv::-webkit-scrollbar-thumb,
  body::-webkit-scrollbar-thumb {
    background-color: #ee3c47;
    outline: 1px solid #ee3c47;
  }
`;
