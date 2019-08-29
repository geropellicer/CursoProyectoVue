Vue.component("tarea", {
    props:{
        tarea: {
            type: Object,
            required: true
        }
    },
    data:function(){
        return{
            descripcion: 'Eto no e coca',
        }
    },
    methods: {
        aumentarTareasRestantes(){
            this.tareasRestantes++;
        },
        disminuirTareasRestantes(){
            this.tareasRestantes--;
        },
        eliminar(){
            this.$emit('eliminar-tarjeta', descripcion);
        }
    },
    template: `
        <div class="card w-100">
            <div class="card-body">
                <h5 class="card-title">Tarea</h5>
                <p class="card-text">{{ tarea.descripcion }}</p>
                <button @click="eliminar()" type="button" class="ml-2 mb-1 close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    `
})
Vue.component("contador-texto", {
    props:{
    },
    data:function(){
        return{
            tareasRestantes: 1
        }
    },
    methods: {
        aumentarTareasRestantes(){
            this.tareasRestantes++;
        },
        disminuirTareasRestantes(){
            this.tareasRestantes--;
        }
    },
    template: `
        <h5 class="card-header" @aumentar-contador="aumentarTareasRestantes">Tareas restantes: {{ tareasRestantes }}</h5>
    `
})
Vue.component("input-tarea", {
    props:{
        tareasRestantes: 0

    },
    data: function(){
        return{
            texto: ''
        }
    },
    methods: {
        agregarTarea(){
            console.log("Agregando");
            this.$emit('emitir-agregartarea', this.texto, 1);
        }
    },
    template: `
        <div class="input-group">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100">Tarea nueva</span>
            </div>
            <form @submit.prevent="agregarTarea()" class="w-75" >
                <input v-model="texto" placeholder="Que tienes que hacer?" class="form-control py-4" aria-label="With textarea">
            </form>
        </div>
    `
})
var app = new Vue({
    el: '#app',
    data: {
        tareasRestantes: 0,
        tareas: [
            { descripcion: 'Hay que hacer muchas cosas.', prioridad: 1 }
        ]
    },
    methods: {
        enviarAgregarTarea(texto, _prioridad){
            console.log("enviando");
            this.tareas.push({descripcion: texto, prioridad: _prioridad});
            this.enviarAumentarContador();
        },
        enviarAumentarContador(){
            this.$emit('aumentar-contador');
        },
        enviarEliminarTarjeta(descripcion){
            delete this.tareas[descripcion]
        }
    },
    computed: {

    }
});