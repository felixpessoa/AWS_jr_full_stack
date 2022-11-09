import { Produto } from './model/produto';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from './service/produto.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  produtos: Produto[] = [];
  produto?: Produto;

  closeResult: string = '';

  produtoForm = this.fb.group({
    id: [],
    nome: [null, Validators.required],
    valor: [null, Validators.required],
    descricao: []
  })

  produtoFormUp = this.fb.group({
    id: [],
    nome: [null, Validators.required],
    valor: [null, Validators.required],
    descricao: []
  })

  constructor(
    private fb: FormBuilder,
    private service: ProdutoService,
    private modalService: NgbModal,

  ) {
    this.buscarProdutos();

  }


  buscarProdutos() {
    this.service.buscarTodos().subscribe({
      next: (res) => {
        this.produtos = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  criarProduto(): Produto {
    return {
      id: this.produtoForm.get('id')?.value,
      nome: this.produtoForm.get('nome')?.value,
      valor: this.produtoForm.get('valor')?.value,
      descricao: this.produtoForm.get('descricao')?.value,
    }
  }

  criarProdutoUp(): Produto {
    return {
      id: this.produtoFormUp.get('id')?.value,
      nome: this.produtoFormUp.get('nome')?.value,
      valor: this.produtoFormUp.get('valor')?.value,
      descricao: this.produtoFormUp.get('descricao')?.value,
    }
  }

  salvar() {
    if (this.produtoForm) {
      const produto = this.criarProduto();
      console.log('produto', produto);
      this.service.salvar(produto).subscribe(
        {
          next: (res) => {
            this.produtoForm.reset();
            this.buscarProdutos()
            Swal.fire(
              'Produto salvo com sucesso.',
              'Aperte em Ok!',
              'success'
            )
            // alert("Produto salvo com sucesso.");
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    }
  }

  open(content: any, produto: Produto) {
    this.produto = produto;
    this.produtoFormUp.patchValue({
      id: produto.id,
      nome: produto.nome,
      valor: produto.valor,
      descricao: produto.descricao
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  update(produto: Produto) {
    if (this.produtoForm) {
      const produto = this.criarProdutoUp();
      console.log('produto', produto);
      this.service.update(produto).subscribe(
        {
          next: (res) => {
            this.produtoForm.reset();
            this.buscarProdutos()
            Swal.fire(
              'Produto atualizado com sucesso.',
              'Aperte em Ok!',
              'success'
            )
            // alert("Produto atualizado com sucesso.");
            this.modalService.dismissAll();
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  remover(produto: Produto) {
    // const confirmacao = confirm('Quer realmente excluir esse produto? ' + produto.nome);
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.remover(produto.id!).subscribe({
          next: (res) => {
            this.buscarProdutos()
            Swal.fire(
              'Deletado!',
              'Seu Produto foi excluído.',
              'success'
            )
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    })
  }








}
