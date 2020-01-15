package at.fhv.students.repository;

import at.fhv.students.domain.Todo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Todo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
