import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  animatedUsername: string = '';
  waveUsername: string[] = [];
  _authService = inject(AuthService)
  ngOnInit(): void {
    this.prepareWaveUserName();
    console.log(this.role)
  }
  get userName() {
    return localStorage.getItem('userName');
  }
  get role() {
    return localStorage.getItem('role');
  }
  prepareWaveUserName () {
    this.waveUsername = this.userName!.split('');
  }
}
