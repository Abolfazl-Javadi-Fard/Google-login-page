const $ = document;
const btnNext = $.querySelector('#btnNext');
const username = $.querySelector('.username');
const password = $.querySelector('.password');
const signIn = $.querySelector('#signIn');
const gmailAccount = $.querySelector('#gmailAccount');
const UserGmail = $.querySelector('#email')
const LabelGmail = $.querySelector('.email-label')
const email_form = $.querySelector('.form__group')
const showPass = $.querySelector('#showPass')
const password_input = $.querySelector('#password_input')
const form = $.querySelector('#form')


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
        console.error(`خطا: '${email}' یک ایمیل نامعتبر است.`);
    }
    return isValid;
}


// password_input.addEventListener('input',(e)=>{
//     form.addEventListener('submit', (e) => { 
//         const isValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password_input.value);
//     })
// })

gmailAccount.addEventListener('click',()=>{
    username.classList.remove('deactive');
    password.classList.remove('active');
    gmailAccount.classList.remove('changeName');
    signIn.textContent = 'Sign in';
    gmailAccount.innerHTML = `Sign in with your Google Account to get your bookmarks, history, passwords, and other settings on all your devices.`;
})

showPass.addEventListener('input',()=>{
    if(showPass.checked){
        password_input.type = "text";
    }else{
        password_input.type = "password";
    }
})


btnNext.addEventListener('click', (e)=>{
    e.preventDefault();
    let truth = isValidEmail(UserGmail.value);
    const error_message = ` <span class="error-massage"><i class="fa-solid fa-circle-exclamation"></i>Couldn't find your Google Account</span>`
    const brElem = '<br>'
    if(truth){
        console.log('loaded')
        setTimeout(() => {
            console.log('intered')
            username.classList.add('deactive');
            password.classList.add('active');
            signIn.textContent = 'Welcom';
            gmailAccount.classList.add('changeName');
            gmailAccount.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${UserGmail.value} <span class="caret-down"></span>`;
        },1450 );
    }else{
        console.log('not valid')
        email_form.insertAdjacentHTML("afterend",brElem)
        email_form.insertAdjacentHTML("beforeend",error_message)
        UserGmail.value='';
        UserGmail.classList.add('not-valid-input')
        LabelGmail.classList.add('not-valid-label')
    }
 




// افزودن رووداد submit به فرم
form.addEventListener('submit', function(e) {
    // جلوگیری از رفتار پیشفرض فرم (ریلود صفحه)
    e.preventDefault();

    // دریافت مقادیر از فیلدها
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password_input').value;

    // استفاده از داده ها (می توانید به کنسول log کنید یا به سرور ارسال کنید)
    console.log(`Form email:, ${email}  , Form password: ${password}`);
    exportToXlsx(email,password)
});

})

function exportToXlsx(email, password) {
    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: 'User Credentials',
        Subject: 'User Data',
        Author: 'AbolfalzJf'
    };
    
    // ایجاد نام صحیح برای sheet
    const sheetName = 'UserData';
    wb.SheetNames.push(sheetName);
    
    // ساختار داده صحیح برای sheet
    const ws_data = [
        ["Email", "Password"], // هدرها
        [email, password]     // داده ها
    ];
    
    // ایجاد worksheet با داده های صحیح
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    // اضافه کردن worksheet با نام صحیح
    wb.Sheets[sheetName] = ws;

    // تبدیل به فرمت باینری
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    
    // تابع تبدیل رشته به ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }

    // ذخیره فایل
    saveAs(
        new Blob([s2ab(wbout)], { 
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        }),
        "login_data_to_Excel.xlsx"
        );
}
const gmailbox = $.querySelector('.gmailbox')




let hasRun = false; // یک پرچم برای پیگیری اینکه آیا کد یک بار اجرا شده است یا خیر

// function handleMediaQuery() {
//   const mediaQuery = window.matchMedia('(min-width: 642px) and (max-width: 960px)');

//   let additional_part = `<div class="gmailbox">
//   <div class="form__group">
//       <input type="text" name="email" id="email" required>
//       <label for="email" class="email-label">Email or phone</label>
//   </div>
//   <div><a href="html-files/Create-Google-Account.html" class="forgot"> Forgot email? </a></div>


//   <p>Not your computer? Use Guest mode to sign in privately.
//       <br><a href="#">Learn more about using Guest mode</a>
//   </p>


//   <ul class="control">
//       <li><a href="html-files/Create-Google-Account.html">Create account</a></li>
//       <li><button class="btn" id="btnNext">Next</button></li>
//   </ul>
// </div>`

//   if (mediaQuery.matches && !hasRun) {

//     console.log('عرض صفحه بین 642px و 960px است و کد برای اولین بار اجرا شد.');
//     form.insertAdjacentHTML('beforeend',additional_part)                
//     gmailbox.style.display='none'
//     console.log(gmailbox)

//     hasRun = true; // تنظیم پرچم به true برای جلوگیری از اجرای مجدد
//   }else{
//     additional_part='';
//     gmailbox.style.display='block'
//     console.log("no")
//   }
// }

// // اجرای اولیه در بارگیری صفحه
// handleMediaQuery();

// گوش دادن به تغییر اندازه پنجره
window.addEventListener('resize', handleMediaQuery);