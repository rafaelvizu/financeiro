export function validateEmail(email:string)
{
     const re = /\S+@\S+\.\S+/;
     return re.test(email);
}

export function validatePassword(password:string)
{
     const re = /^\S{6,16}$/;
     return re.test(password);
}

export function validateName(name:string)
{
     const re = /^\S{2,16}$/;
     return re.test(name);
}

export function validatePhone(phone:string){
     const re = /^\d{10,11}$/;
     return re.test(phone);
}

export function validateAddress(address:string)
{    
     address = address.trim();

     const re = /^[a-zA-Z0-9\s,.'-]{3,50}$/;
     return re.test(address);
}
