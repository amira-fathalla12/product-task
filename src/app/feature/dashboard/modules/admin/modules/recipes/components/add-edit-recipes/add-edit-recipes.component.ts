import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from './../../services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent {
  recipeForm!: FormGroup;
  tagList:any = []
  categoriesList:any = []
  selectedFileName: string = '';
  fileTouched = false;
  files: File[] = [];
  recipeId = 0
  baseUrl = environment.baseUrl ;
  constructor(private fb: FormBuilder,
              private _recipesService:RecipesService,
              private toastr:ToastrService,
              private route: ActivatedRoute,
              private router: Router
            ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      // recipeImage: [null],
      tagId: ['', Validators.required],
      categoriesIds: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.recipeId = +(this.route.snapshot.paramMap.get('id') || 0)
    console.log(this.recipeId)
    this.getTags()
    this.getCategories()
    this.getRecipeById()
  }

  getRecipeById(){
    if(this.recipeId > 0){
      this._recipesService.getRecipeById(this.recipeId).subscribe((res:any) => {
        this.recipeForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          recipeImage: res.recipeImage,
          tagId: res.tag.id,
          categoriesIds: res.category.map((c:any) => c.id),
        })
        if (res.imagePath) {
          this.selectedFileName = this.baseUrl + res.imagePath;
          fetch(this.selectedFileName)
            .then((response) => response.blob())
            .then((blob) => {
              const file = new File([blob], res.imagePath.split('/').pop() || 'recipe.jpg', { type: blob.type });
              this.files.push(file);
            });
        }
      })
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const formData = new FormData();
      formData.append('name', this.recipeForm.value.name);
      formData.append('description', this.recipeForm.value.description);
      formData.append('price', this.recipeForm.value.price);
      formData.append('tagId', this.recipeForm.value.tagId);
      formData.append('categoriesIds', this.recipeForm.value.categoriesIds);
      if (this.files) {
        formData.append('recipeImage', this.files[0]);
      }
      // Add Recipe
      if(this.recipeId == 0){
        this._recipesService.addRecipe(formData).subscribe({
          next: (res) => {
            this.toastr.success('Recipe added successfully')
          },
          error: (err) => {
            this.toastr.error('Error adding recipe')
          },
          complete: () =>{
            this.router.navigate(['/dashboard/admin/recipes'])
          }
        });
      }
      // Edit Recipe
      else if(this.recipeId > 0) {
        formData.append('id', this.recipeId.toString());
        this._recipesService.updateRecipe(formData).subscribe({
          next: (res) => {
            this.toastr.success('Recipe Updated successfully')
          },
          error: (err) => {
            this.toastr.error('Error Updated recipe')
          },
          complete: () =>{
            this.router.navigate(['/dashboard/admin/recipes'])
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  getTags(){
    this._recipesService.getTags().subscribe({
      next: (res) => {
        this.tagList = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getCategories(){
    this._recipesService.getCategories().subscribe({
      next: (res:any) => {
        this.categoriesList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
