package npo.passat.paymentSchedule.service;

import npo.passat.paymentSchedule.model.UserActions;
import npo.passat.paymentSchedule.repository.UserActionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userActionsService")
public class UserActionsService {
    @Autowired
    private UserActionsRepository userActionsRepository;

    public void addUserActions(UserActions userActions) {
        userActionsRepository.saveAndFlush(userActions);
    }
}
