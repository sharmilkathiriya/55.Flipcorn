const newStyles = {
    cover: {backgroundColor: '#2874f0', p: 1.2, display: 'flex', justifyContent: 'space-between'},
    leftHeader: {display: 'flex', alignItems: 'center'},
    menuIcon: {pr: 1, color: 'white'},
    menuBackIcon: {pr: 1, color: 'white', cursor: 'pointer'},
    cartBackIcon: {pr: 1, cursor: 'pointer'},
    headerLogo: {width: "85px"},
    rightHeader: {pr: 1, mt: 0.6},
    badgePosition: {vertical: 'top', horizontal: 'right'},
    sliderBox: {position: 'absolute', bottom: '0px', left: '0px'},
    headerCartBadge: {border: '2px solid white', backgroundColor: "red", borderRadius: '25px', fontSize: '12px', padding: '0px 2px', color: 'white'},
    cartIcon: {color: 'white',cursor:'pointer'},
    subProductImg: {padding: '3px', width: '-webkit-fill-available'},
    subProBox: {cursor: 'pointer', width: '100px', textAlign: 'center', borderRadius: '10px', m: 1},
    // Start ProductBox Style
    proBox: {},
    sliderProBox: {border: '1px solid #f0f0f0', p: 1, backgroundColor: 'white'},
    proImgBox: {display: 'flex', justifyContent: 'center', cursor: 'pointer'},
    proImg: {maxWidth: '110px', maxHeight: '110px'},
    proLabel: {fontSize: '14px', fontWeight: '500'},
    proLabelView: {fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'},
    proOff: {fontSize: '14px', color: "#9A9A9A"},
    proOffLabel: {fontSize: '13px', color: "#9A9A9A"},
    proOffPrice: {textDecoration: 'line-through'},
    proPriceBox: {fontSize: '14px', fontWeight: '600', alignItems: 'center', display: 'flex'},
    proPriceBoxLabel: {fontSize: '0.9rem', fontWeight: 700},
    proOffList: {fontWeight: '700', fontSize: '0.8rem'},
    proPriceImg: {maxWidth: "77px", paddingLeft: '5px'},
    proRationBox: {display: 'inline-flex', alignItems: 'center'},
    proRatingCont: {
        width: "max-content", backgroundColor: "green", borderRadius: '3px', color: 'white',
        alignItems: 'center', display: 'flex', fontSize: '11px', p: 0.3, pl: 0.5, pr: 0.5, height: 'max-content'
    },
    proStarRating: {color: 'white', fontSize: '13px'},
    proRatingValue: {color: '#cdcdcd', fontWeight: '100', pl: 1, fontSize: '0.9rem'},
    proTitleLimit: {textAlign: 'center', fontSize: '12px', color: 'blue'},
    proBoxBtn: {width: '100%'},
    proBoxBtnInside: {display: 'flex', justifyContent: 'space-around'},
    proExtraLabel: {textAlign: 'center', fontSize: '12px', color: 'blue'},
    proBuyBtn: {
        width: '100%', maxWidth: {sm: '48%', xs: '100%'}, backgroundColor: '#fb641b',
        p: {sm: 1, xs: 0.8}, borderRadius: '6px', color: 'white', fontSize: {sm: 15, xs: 13}, textAlign: 'center', cursor: 'pointer'
    },
    sectionProductBox: {
        border: '1px solid #f0f0f0', maxHeight: '500px', height: '100%', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between',
    },
    sectionProductImageBox: {display: 'flex', justifyContent: 'center'},
    sectionProductImg: {maxHeight: '250px', width: '-webkit-fill-available', maxWidth: 'max-content'},
    sectionProductLabel: {color: '#676767', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'},
    sectionProductType: {fontSize: '0.8rem', fontWeight: 700}

    // End ProductBox Style
}
export default newStyles;
