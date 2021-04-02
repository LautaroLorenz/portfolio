import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projects';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	constructor(private readonly http: HttpClient) {}

	public getProjects(): Observable<Project[]> {
		return this.http.get<Project[]>('./assets/data/projects.json');
	}
}
