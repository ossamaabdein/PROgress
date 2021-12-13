import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasksList:any = [];
  completedTasks: any = [];
  activeTasks: any = [];
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('list') !== null) {
      this.tasksList = JSON.parse(localStorage.getItem('list')!);
    }
  }


  inputField:any = document.getElementsByClassName('taskTitle');
  addTask(userInput:any) {
    if (userInput.value !== "") {
      this.tasksList.push(userInput.value);
      userInput.value = '';
      localStorage.setItem('list', JSON.stringify(this.tasksList));
    }
  }

  deleteTask(i:number) {
    this.tasksList.splice(i,1);
    localStorage.setItem('list', JSON.stringify(this.tasksList));
  }

  decorate(i:any) {
    if(!this.inputField[i].classList.contains('checked')) {
      this.inputField[i].classList.add('checked');
      this.completedTasks.push(this.inputField[i].innerText);
      localStorage.setItem('completed', this.completedTasks);
      this.activeTasks.splice(i,1);
      this.activeTasks = this.tasksList.filter((x:any) => !this.completedTasks.includes(x));
    } else {
      this.inputField[i].classList.remove('checked');
      this.completedTasks.splice(i,1);
      localStorage.setItem('completed', this.completedTasks);
      this.activeTasks.push(this.inputField[i].innerText);
      this.activeTasks = this.tasksList.filter((x:any) => !this.completedTasks.includes(x));
    }
  }

  displayAll() {
    this.tasksList = JSON.parse(localStorage.getItem('list')!);
  }

  displayActive() {
    // console.log(this.tasksList)
    // console.log(this.completedTasks)
    // this.activeTasks = this.tasksList.filter((x:any) => !this.completedTasks.includes(x));
    console.log(this.activeTasks);
    // this.tasksList = this.activeTasks;
  }

  displayCompleted() {
    this.tasksList = this.completedTasks;
  }

  clearCompleted() {
    this.tasksList = this.tasksList.filter((x:any) => !this.completedTasks.includes(x));
  }

}
