<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Lista de Estudiantes</div>
 <v-form>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            <v-text-field
                                label="Buscar"
                                :disabled="busy"
                                v-on:keyup="find"
                                v-model="search"
                                color="dark"
                                hide-details
                                outlined
                                dense
                            ></v-text-field>

                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-form>
                   

                    <div class="card-body">
                        <button
                            class="btn btn-success"
                            data-toggle="modal"
                            @click.prevent="showstudent(student)"
                        >
                            <i class="fas fa-plus"></i>
                            Nuevo Estudiante
                        </button>
                    </div>

                    <div class="card-body">
                        <table class="table table-hover" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in students" :key="student.id">
                                  
                                    <td>{{student.id }}</td>
                                    <td>{{ student.email }}</td>
                                     <td>{{ student.password }}</td>
                                   

                                    <td
                                        @click="showstudent(student)"
                                        class="btn btn-info table-active"
                                    >
                                        <i class="far fa-edit"></i>
                                    </td>
                                    <td
                                        @click.prevent="deletestudent(student)"
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
                        &nbsp;&nbsp;&nbsp; Información de la Materia
                    </h5>
                    <div class="modal-header">
                        <form class="row g-3" id="miForm" ref="textareaform">
                              <input type="hidden" v-model="form.status" />
                            <input type="hidden" v-model="form.id" />
                            <div class="col-md-6">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >E-mail</label
                                >
                                <input
                                    type="text"
                                   
                                    id="email"
                                    placeholder="E-mail"
                                    v-model="form.email"
                                    required
                                />
                            </div>
                            <div class="col-md-6">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Password</label
                                >
                                <input
                                    type="text"
                                   
                                    id="email"
                                    placeholder="Password"
                                    v-model="form.password"
                                    required
                                />
                            </div>

                            

                            
                            <br />
                            <br />
                            <br />
                            <div class="col-md-12">
                                <button
                                    class="btn btn-success"
                                    @click.prevent="Addstudent()"
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
