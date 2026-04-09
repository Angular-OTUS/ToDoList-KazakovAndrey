import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
    {
        path: 'backlog',
        loadComponent: () => import("src/app/components/todo-list/todo-list").then(m => m.TodoList),
        children: [
            {
                path: ':todoId',
                loadComponent: () => import("src/app/components/todo-desc/todo-desc").then(m => m.TodoDesc),
            },
        ],
    },
    {
        path: 'board',
        loadComponent: () => import("src/app/components/todo-board/todo-board").then(m => m.TodoBoard),
    },
    {
        path: '**',
        redirectTo: 'board',
    },
];
