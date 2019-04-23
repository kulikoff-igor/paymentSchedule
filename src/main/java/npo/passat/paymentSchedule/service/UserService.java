package npo.passat.paymentSchedule.service;

import npo.passat.paymentSchedule.model.Role;
import npo.passat.paymentSchedule.model.User;
import npo.passat.paymentSchedule.repository.RoleRepository;
import npo.passat.paymentSchedule.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service("userService")
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public User saveUser(User user, List<String> roles) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(1);
        HashSet<Role> userRoles = new HashSet<>();
        for (String role : roles) {
            Role userRole = roleRepository.findByRole(role);
            userRoles.add(userRole);
        }
        user.setRoles(userRoles);
        return userRepository.save(user);
    }

}
