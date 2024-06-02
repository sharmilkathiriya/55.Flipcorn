import {alpha, styled} from "@mui/material";
import InputBase from "@mui/material/InputBase/InputBase";

const newStyles = {
// Start Dashboard Style
    cover: {},
    searchArea: {
        backgroundColor: '#2874f0',
        pl: 5, pr: 5, pb: 1.3
    },
    saleBtn: {
        height: 'max-content',
        color: 'red',
        backgroundColor: 'white',
        fontWeight: 700,
        borderRadius: '4px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        p: 1, mr: 1,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    },
    dashboardBanner: {width: '-webkit-fill-available'},
    dealsCount: {display: "flex", justifyContent: 'center'},
    dealsLabel: {color: '#2873ee'},
    dealsTitle: {alignItems: 'center', display: 'flex', justifyContent: 'center', color: '#2873ee'},
    saleLabel: {display: "flex", justifyContent: {xs: 'center', sm: 'end'}},
    countTime: {color: 'gray'},
    horizontalCard: {
        pb: 1, pt: 1, mt: 2, mb: 2, backgroundColor: "#f0eff4",
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
    },
    verticalCard: {
        pb: 1, pt: 1, mt: 2, mb: 2, backgroundColor: "#f0eff4",
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
    },
    // End Dashboard Style

    // Start Product Style
    footerComponent: {
        display: "block",
        height: "60px",
        width: "100%"
    },
    footerBtn: {
        backgroundColor: "white",
        color: "white",
        textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%"
    },
    footerLeftBtn: {
        color: 'black',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    footerRightBtn: {border: '1px solid #fb641b', backgroundColor: '#fb641b', borderRadius: '2px', p: 1.7, cursor: 'pointer'},
    screenStyle: {backgroundColor: "#f1f2f4"},
    productView: {
        display: 'flex',
        justifyContent: 'center',
        mb: 2,
    },
    productViewArea: {maxWidth: {xs: '100%', sm: '75%'}, minWidth: {xs: '100%', sm: '75%'}, backgroundColor: 'white'},
    productFirstDetails: {fontWeight: 600, fontSize: '1.2rem', m: 1},
    productSecondDetails: {fontWeight: 600, fontSize: '1.2rem', m: 1},
    secondDetails: {display: 'flex'},
    secondDetailsView: {
        cursor: 'pointer',
        width: 'max-content',
        textAlign: 'center',
        borderRadius: '6px',
        m: 1,
        pl: 1, pr: 1,
    },
    // End Product Style

    // Start Cart Style
    cartFirstLabel: {display: 'flex', p: 1.5},
    cartDetailBox: {p: 1, maxWidth: '50%'},
    stepperBrn: {
        display: 'flex',
        justifyContent: 'center'
    },
    osDetails:{p:1},
    osDetailsDel:{fontSize: '1.6rem'},
    osProData:{fontWeight: 700, fontSize: '1.2rem'},
    osOffData:{color: '#008c00'},
    osFullPrice:{textDecoration: 'line-through', color: 'rgb(113, 116, 120)'},
    allDetails:{fontSize: '1.6rem'},
    detailsLine:{display: 'flex',
        justifyContent: 'space-between'},
    detailsTitle:{fontSize:'0.8rem'},
    // End Cart Style

    addProductTitle:{ml: 1, display: 'flex', justifyContent: 'center', fontSize: '1.9rem'},
addProBtn:{mt: 2, display: 'flex', justifyContent: 'center'},
    subProductTitle:{ml: 1, display: 'flex', justifyContent: 'center', fontSize: '1.9rem'},
    subProFil:{
        border: '1px solid #bebebe', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px' +
            ' 0px 1px', m: 1, pl: 1, pr: 3, borderRadius: 3
    },
    addSubProBtn:{display: 'flex', justifyContent: 'center'},
    addSubProIcon:{color: '#fb641b', cursor: 'pointer', fontSize: '3rem'},
    addPro:{display: 'flex', justifyContent: 'center', mt: 2},
    loginPage:{            display: 'flex',
        justifyContent: 'center',
        height: '100dvh',
        backgroundColor: '#f1f2f4'},
    loginPageFields:{
        mt: 10,
        backgroundColor: 'white',
        border: '1px solid #b7b7b7',
        height: 'max-content',
        borderRadius: '7px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        p: 3
    },
    loginPageTitle:{ fontSize: '2.5rem', textAlign: 'center' },
loginPsError:{ mt: 2, textAlign: 'center' },
loginBtn:{ display: 'flex', mt: 4, justifyContent: 'center' },
    cartBtnTitle:{
        display: 'flex',
        justifyContent: 'center'
    },
    cartField:{p: 1, maxWidth: '50%'}
};
export default newStyles;

export const BootstrapInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: '100%',
        padding: '8px 10px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));
