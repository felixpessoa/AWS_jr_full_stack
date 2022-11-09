import { Produto } from './../model/produto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _URL = environment.url + 'produto'

  constructor(
    private http: HttpClient,
  ) { }

  buscarTodos() {
    return this.http.get<Produto[]>(this._URL);
  }

  findById(id: number) {
    return this.http.get<Produto>(`${this._URL}/${id}`)
  }

  salvar(produto: Produto) {
    return this.http.post<Produto>(this._URL, produto)
  }

  update(produto: Produto) {
    return this.http.put<Produto>(this._URL, produto)
  }

  remover(id: number) {
    return this.http.delete(`${this._URL}/${id}`)
  }

}
