package npo.passat.paymentSchedule.repository;

import npo.passat.paymentSchedule.model.UserActions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userActionsRepository")
public interface UserActionsRepository extends JpaRepository<UserActions, Integer> {
}
