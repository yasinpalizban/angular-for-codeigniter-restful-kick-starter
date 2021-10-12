import {FormGroup} from '@angular/forms';

export function CompressSearchForm(formRaw: FormGroup): FormGroup {

  let index = 0;
  let Yandex = 0;
  let length = formRaw.value._data.length;
  const dummies = formRaw;
  const func = formRaw.value._function;
  while (true) {
    const arr1 = [];
    const arr2 = [];

    if (length <= 1) {
      break;
    }


    while (true) {
      if (formRaw.value._data[index]._field === formRaw.value._data[Yandex + 1]._field) {

        if (func === 'whr' || func === 'owr') {
          arr2.push(formRaw.value._data[index]._sign);
          arr2.push(formRaw.value._data[Yandex + 1]._sign);
        } else {
          arr2.push('');
          arr2.push('');

        }

        arr1.push(formRaw.value._data[index]._value);
        arr1.push(formRaw.value._data[Yandex + 1]._value);

        dummies.value._data[index]._value = arr1;
        dummies.value._data[index]._sign = arr2;
        delete dummies.value._data[Yandex + 1];
        break;
      }

      if (Yandex + 1 < length) {
        break;
      }
      Yandex++;

    }


    formRaw = dummies;
    length = formRaw.value._data.length;

    if (index < length) {
      break;
    }
    index++;

  }
  formRaw.value._data = formRaw.value._data.filter(() => true);
  return formRaw;
}
