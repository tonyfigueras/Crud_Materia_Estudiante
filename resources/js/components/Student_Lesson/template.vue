<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Lista de Estudiantes - Materia</div>
                   

                    <div class="card-body">
                        <button
                            class="btn btn-success"
                            data-toggle="modal"
                            @click.prevent="showstudentlesson(studentslesson)"
                        >
                            <i class="fas fa-plus"></i>
                            Nuevo Estudiante - Materia
                        </button>
                    </div>

                    <div class="card-body">
                        <table class="table table-hover" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">E-mail Estudiante</th>
                                    <th scope="col">Nombre Materia</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="studentslesson in studentslessons" :key="studentslesson.id">
                                  
                                    <td>{{studentslesson.id }}</td>
                                    <td>{{ studentslesson.student.email }}</td>
                                     <td>{{ studentslesson.lesson.name }}</td>
                                   

                                    <td
                                        @click="showstudentlesson(studentslesson)"
                                        class="btn btn-info table-active"
                                    >
                                        <i class="far fa-edit"></i>
                                    </td>
                                    <td
                                        @click.prevent="deletestudentlesson(studentslesson)"
                                        class="btn btn-danger table-active"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <v-pagination
                        v-model="pagination.current"
                        :length="pagination.total"
                        @input="onPageChange"
                    ></v-pagination>
                </div>
            </div>
        </div>

        <!-- Moda Carga de Datos -->

        <div id="myModalcarga" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <!-- Modal content-->
                <div class="modal-content">
                    <h5 class="modal-title" id="Cargar Bancos">
                        &nbsp;&nbsp;&nbsp; Información del Estudiante - Materia 
                    </h5>
                    <div class="modal-header">
                        <form class="row g-3" id="miForm" ref="textareaform">
                              <input type="hidden" v-model="form.status" />
                            <input type="hidden" v-model="form.id" />
                            <div class="col-md-6">
                            <label>Nombre Materia</label>
                            <select class='form-control' v-model='form.id_lesson'>
                               <option v-for='data in get_lesson' :key='data.id' :value='data.id' >{{ data.name }}</option>
                            </select>
                        </div>
                            <div class="col-md-6">
                            <label>E-mail Estudiante</label>
                            <select class='form-control' v-model='form.id_student'>
                               <option v-for='data in get_student' :key='data.id' :value='data.id'>{{ data.email }}</option>
                            </select>
                        </div>

                            

                            
                            <br />
                            <br />
                            <br />
                            <div class="col-md-12">
                                <button
                                    class="btn btn-success"
                                    @click.prevent="Addstudentlesson()"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
