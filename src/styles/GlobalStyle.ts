import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /* Reset default margin and padding */
    body, h1, h2, h3, h4, h5, h6, p, ul, ol, figure, blockquote, dl, dd {
        margin: 0;
        padding: 0;
    }

    /* Set box-sizing to border-box for easier layout */
    *, *::before, *::after {
        box-sizing: border-box;
    }

    /* Define responsive font sizes */
    html {
        font-size: 16px; /* Base font size */
    }

    @media (min-width: 576px) {
        html {
            font-size: 18px;
        }
    }

    @media (min-width: 768px) {
        html {
            font-size: 20px;
        }
    }

    @media (min-width: 992px) {
        html {
            font-size: 22px;
        }
    }

    @media (min-width: 1200px) {
        html {
            font-size: 24px;
        }
    }

    /* Define responsive layout */
    body {
        font-family: Roboto, sans-serif;
        line-height: 1.6;
    }
`

export default GlobalStyle