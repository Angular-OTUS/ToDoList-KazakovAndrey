import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks',
        loadComponent: () => import("src/app/components/todo-list/todo-list").then(m => m.TodoList),
        children: [
            {
                path: ':todoId',
                loadComponent: () => import("src/app/components/todo-desc/todo-desc").then(m => m.TodoDesc),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'tasks',
    },
];
