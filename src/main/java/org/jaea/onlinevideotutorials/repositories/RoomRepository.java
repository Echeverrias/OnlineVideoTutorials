package org.jaea.onlinevideotutorials.repositories;

import java.util.List;
import org.jaea.onlinevideotutorials.domain.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepository extends CrudRepository<Room, Long>{
    public List<Room> findByName(String name);
}