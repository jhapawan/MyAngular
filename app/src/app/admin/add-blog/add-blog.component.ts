
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExampleValues_Frameworks } from '../../shared/selectize/selectize';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  frmblog: FormGroup;
  title: AbstractControl;
  tag: AbstractControl;
  description: AbstractControl;
  ckeditorContent: string = '<p>Some html</p>';
  items = ['Pizza', 'Pasta', 'Parmesan'];
  requiredDropdownOptions: any = ExampleValues_Frameworks.slice(0);


  config: any = {
    create: true,
    labelField: 'label',
    valueField: 'value',
    maxItems: 50,
    searchField: ['label', 'value'],
  };
  value: any = [];
  constructor(private fb: FormBuilder, private blogApi: BlogService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(): any {
    this.frmblog = this.fb.group(
      {
        'title': ['', Validators.compose([Validators.required])],
        'tag': [, Validators.compose([Validators.required])],
        'description': ['', Validators.compose([Validators.required])],
      })
    this.title = this.frmblog.controls['title'];
    this.tag = this.frmblog.controls['tag'];
    this.description = this.frmblog.controls['description'];
  }
  /**CK Editor Function */

  onChange(event: any) {

  }
  onReady(event: any) {

  }
  onFocus(event: any) {

  }
  onBlur(event: any) {
  }
  onEditorChange(event: any) { }
  onContentDom(event: any) { }
  onFileUploadRequest(event: any) { }
  onFileUploadResponse(event: any) { }
  onPaste(event: any) { }
  onDrop(event: any) { }
  onPostBlog() {
    console.log(this.tag)
    console.log(this.frmblog.valid);

    if (this.frmblog.valid) {
      this.blogApi.addBlogPost(this.frmblog.value).subscribe(
        result => { console.log(result); }
        , Error => { console.log("Error"); }
      )
    }
    else {
      this.validateAllFormFields(this.frmblog)
      console.log("No Validate");
    }

  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

}
