var _0x77de=["\x73\x75\x62\x73\x74\x72","\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D","","\x63\x68\x61\x72\x41\x74","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x6C\x65\x6E\x67\x74\x68","\x6A\x6F\x69\x6E","\x72\x65\x70\x6C\x61\x63\x65"];

function base64_decode(_0x4e6bx2,_0x4e6bx3){
    var _0x4e6bx4=_0x4e6bx2[_0x77de[0]](0,_0x4e6bx3);
    var _0x4e6bx5=_0x4e6bx2[_0x77de[0]](_0x4e6bx3+10);
    
    _0x4e6bx2=_0x4e6bx4+_0x4e6bx5;
    
    var _0x4e6bx6=_0x77de[1];
    var _0x4e6bx7,
        _0x4e6bx8,
        _0x4e6bx9,
        _0x4e6bxa,
        _0x4e6bxb,
        _0x4e6bxc,
        _0x4e6bxd,
        _0x4e6bxe,
        _0x4e6bxf=0,
        _0x4e6bx10=0,
        _0x4e6bx11=_0x77de[2],
        _0x4e6bx12=[];
    
    if(!_0x4e6bx2){
        return _0x4e6bx2;
    };
    
    _0x4e6bx2+=_0x77de[2];
    
    do{
        _0x4e6bxa=_0x4e6bx6[_0x77de[4]](_0x4e6bx2[_0x77de[3]](_0x4e6bxf++));
        _0x4e6bxb=_0x4e6bx6[_0x77de[4]](_0x4e6bx2[_0x77de[3]](_0x4e6bxf++));
        _0x4e6bxc=_0x4e6bx6[_0x77de[4]](_0x4e6bx2[_0x77de[3]](_0x4e6bxf++));
        _0x4e6bxd=_0x4e6bx6[_0x77de[4]](_0x4e6bx2[_0x77de[3]](_0x4e6bxf++));
        
        _0x4e6bxe=_0x4e6bxa<<18|_0x4e6bxb<<12|_0x4e6bxc<<6|_0x4e6bxd;_0x4e6bx7=_0x4e6bxe>>16&0xff;
        _0x4e6bx8=_0x4e6bxe>>8&0xff;_0x4e6bx9=_0x4e6bxe&0xff;
        
        if(_0x4e6bxc==64){
            _0x4e6bx12[_0x4e6bx10++]=String[_0x77de[5]](_0x4e6bx7);
        } else {
            if(_0x4e6bxd==64){
                _0x4e6bx12[_0x4e6bx10++]=String[_0x77de[5]](_0x4e6bx7,_0x4e6bx8);
            } else {
                _0x4e6bx12[_0x4e6bx10++]=String[_0x77de[5]](_0x4e6bx7,_0x4e6bx8,_0x4e6bx9);
            };
        };
    } while(_0x4e6bxf<_0x4e6bx2[_0x77de[6]]);
    
    _0x4e6bx11=_0x4e6bx12[_0x77de[7]](_0x77de[2]);
    
    return new Buffer(escape(_0x4e6bx11[_0x77de[8]](/\0+$/,_0x77de[2]))).toString('utf8')
    //return decodeURIComponent(escape(_0x4e6bx11[_0x77de[8]](/\0+$/,_0x77de[2])));
};


module.exports = {
    base64_decode: base64_decode
}