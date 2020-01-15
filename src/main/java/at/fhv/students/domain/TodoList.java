package at.fhv.students.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A TodoList.
 */
@Entity
@Table(name = "todo_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TodoList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "expirydate")
    private LocalDate expirydate;

    @OneToMany(mappedBy = "todoList")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Todo> todos = new HashSet<>();

    @ManyToMany(mappedBy = "todoLists")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Team> teams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TodoList name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDone() {
        return done;
    }

    public TodoList done(Boolean done) {
        this.done = done;
        return this;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public LocalDate getExpirydate() {
        return expirydate;
    }

    public TodoList expirydate(LocalDate expirydate) {
        this.expirydate = expirydate;
        return this;
    }

    public void setExpirydate(LocalDate expirydate) {
        this.expirydate = expirydate;
    }

    public Set<Todo> getTodos() {
        return todos;
    }

    public TodoList todos(Set<Todo> todos) {
        this.todos = todos;
        return this;
    }

    public TodoList addTodo(Todo todo) {
        this.todos.add(todo);
        todo.setTodoList(this);
        return this;
    }

    public TodoList removeTodo(Todo todo) {
        this.todos.remove(todo);
        todo.setTodoList(null);
        return this;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public TodoList teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public TodoList addTeam(Team team) {
        this.teams.add(team);
        team.getTodoLists().add(this);
        return this;
    }

    public TodoList removeTeam(Team team) {
        this.teams.remove(team);
        team.getTodoLists().remove(this);
        return this;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TodoList)) {
            return false;
        }
        return id != null && id.equals(((TodoList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TodoList{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", done='" + isDone() + "'" +
            ", expirydate='" + getExpirydate() + "'" +
            "}";
    }
}
