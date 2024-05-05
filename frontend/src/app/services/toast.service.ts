import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, type: 'error' | 'info' | 'success'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: this.getPanelClass(type)
    };

    this.snackBar.open(message, '', config);
  }

  private getPanelClass(type: string): string[] {
    switch (type) {
      case 'error':
        return ['toast-error'];
      case 'info':
        return ['toast-info'];
      case 'success':
        return ['toast-success'];
      default:
        return [];
    }
  }
}
