package org.jaea.onlinevideotutorials.repositories;

import java.util.List;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.springframework.data.repository.CrudRepository;

public interface MediaRoomRepository extends CrudRepository<MediaRoom, Long>{
    public List<MediaRoom> findByName(String name);
}