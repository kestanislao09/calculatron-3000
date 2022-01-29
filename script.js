function add(a, b) {
    return a + b;
};

function sub(a, b) {
    return a - b;
};

function mul(a, b) {
    return a * b;
};

function div(a, b) {
    return a / b;
};


function operate(a, opr, b) {
    switch(opr){
        default:
            console.log('something went wrong..');
            break;
        case(add):
            add(a, b);
            break;
        case(sub):
            sub(a, b);
            break;
        case(mul):
            mul(a, b)
            break;
        case(div);
            div(a, b);
    };

}