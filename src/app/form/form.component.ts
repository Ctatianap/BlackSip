import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email],),
    phone: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    colony: new FormControl('', [Validators.required]),
  });
  title = 'prueba-tecnica';
  availableColonies = [];
  
  get name() {
    return this.contactForm.get('name')
  }
  get lastName() {
    return this.contactForm.get('lastName')
  }
  get email() {
    return this.contactForm.get('email')
  }
  get phone() {
    return this.contactForm.get('phone')
  }
  get street() {
    return this.contactForm.get('street')
  }
  get code() {
    return this.contactForm.get('code')
  }
  get city() {
    return this.contactForm.get('city')
  }
  get state() {
    return this.contactForm.get('state')
  }
  get town() {
    return this.contactForm.get('town')
  }
  get colony() {
    return this.contactForm.get('colony')
  }

  constructor(
    private http: HttpClient,
  ) { }


  async onGetCode() {
    const data = await this.http.get(`https://blackisp.herokuapp.com/postalCodes/${this.code.value}`).toPromise<any>();

    if (!data.state) {
      this.contactForm.patchValue({ state: '', city: '', town: '' });
      this.availableColonies = []
      return
    }
    this.contactForm.patchValue({ state: data.state, city: data.city, town: data.town, });
    this.availableColonies = data.colonies

  }
  async onSubmit() {

    if (!this.contactForm.valid) {
      return
    }
    // TODO: Use EventEmitter with form value
    console.warn(this.contactForm.value);
    try {
      await this.http.post(`https://blackisp.herokuapp.com/contact`, this.contactForm.value).toPromise<any>();
      alert('Tus datos se han enviado exitosamente');
    } catch {
      alert('Tus no se han podido enviar, intenta nuevamente');
    }

  }

}
