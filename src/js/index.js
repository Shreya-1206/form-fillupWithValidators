const formEl = document.querySelector('form');
const emailFld = document.querySelector("input[name='email']");
const passwordFld = document.querySelector("input[name='password']");
const repasswordFld = document.querySelector("input[name='repassword']");
const fullnameFld = document.querySelector("input[name='fullname']");
const merchantFld = document.querySelector("input[name='merchant']");
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let canSubmit = true;

const submitForm =(data) => {
  console.log(data);
}

const validTheForm = (el, condition) => {
    if(condition) {
        canSubmit = true;
        el.parentElement.classList.remove('form-field-error');
    }else {
        canSubmit = false;
        el.parentElement.classList.add('form-field-error');
    }
}
//validators
emailFld.addEventListener('keyup', function(evt) {
    evt.preventDefault();
    validTheForm(this, evt.target.reportValidity());
});

passwordFld.addEventListener('keyup', function(evt) {
    evt.preventDefault();
    validTheForm(this, passwordRegEx.test(evt.target.value));
});
repasswordFld.addEventListener('keyup', function(evt) {
    evt.preventDefault();
    validTheForm(this, passwordFld === evt.target.value);
});

fullnameFld.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    evt.target.value = evt.target.value.trimLeft();
    validTheForm(this, evt.target.reportValidity())
})

formEl.addEventListener('submit', function(evt) {
    evt.preventDefault();
    //console.log(evt.target.elements['email'].value);
    const getFormValues = [...evt.target.elements].filter((el) =>
        el.type !== 'submit' && el).map((el) => {
            return{
                name: el.getAttribute('name'),
                type: el.type,
                value: el.type === 'checked' ? el.checked :el.value
            }
        });
    const isFilled = getFormValues.filter((el) => el.type !== 'checked').every((el) => el.value !== "");

    isFilled && canSubmit && submitForm(getFormValues);
});
