package at.fhv.students.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Person> people = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "team_todo_list",
               joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "todo_list_id", referencedColumnName = "id"))
    private Set<TodoList> todoLists = new HashSet<>();

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

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Person> getPeople() {
        return people;
    }

    public Team people(Set<Person> people) {
        this.people = people;
        return this;
    }

    public Team addPerson(Person person) {
        this.people.add(person);
        person.setTeam(this);
        return this;
    }

    public Team removePerson(Person person) {
        this.people.remove(person);
        person.setTeam(null);
        return this;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
    }

    public Set<TodoList> getTodoLists() {
        return todoLists;
    }

    public Team todoLists(Set<TodoList> todoLists) {
        this.todoLists = todoLists;
        return this;
    }

    public Team addTodoList(TodoList todoList) {
        this.todoLists.add(todoList);
        todoList.getTeams().add(this);
        return this;
    }

    public Team removeTodoList(TodoList todoList) {
        this.todoLists.remove(todoList);
        todoList.getTeams().remove(this);
        return this;
    }

    public void setTodoLists(Set<TodoList> todoLists) {
        this.todoLists = todoLists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
