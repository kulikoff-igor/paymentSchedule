package npo.passat.paymentSchedule.controller;

import npo.passat.paymentSchedule.model.User;
import npo.passat.paymentSchedule.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller("mainController")
public class MainController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/paymentSchedule/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/paymentSchedule/404", method = RequestMethod.GET)
    public String accessDenied() {
        return "404";
    }

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String error() {
        return "404";
    }

    @RequestMapping(value = "/paymentSchedule/register", method = RequestMethod.GET)
    public ModelAndView registration() {
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("register");
        return modelAndView;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ModelAndView createNewUser(@Valid User user, @RequestParam(value = "adminRole", required = false) String adminRole, @RequestParam(value = "omtsRole", required = false) String omtsRole, @RequestParam(value = "reportRole", required = false) String reportRole, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        List<String> role = new ArrayList<>();
        if (adminRole != null) {
            role.add("ADMIN");
        }
        if (omtsRole != null) {
            role.add("OMTS");
        }
        if (reportRole != null) {
            role.add("REPORT");
        }
        User userExists = userService.findUserByLogin(user.getLogin());
        if (userExists != null || reportRole == null) {
            bindingResult
                    .rejectValue("login", "error.user",
                            "There is already a user registered with the email provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("register");
        } else {
            userService.saveUser(user, role);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("register");

        }
        return modelAndView;
    }

    @RequestMapping(value = "/paymentSchedule", method = RequestMethod.GET)
    public String index() {
        return "plannedPayment";
    }

    @RequestMapping(value = "/paymentSchedule/reportForm", method = RequestMethod.GET)
    public String reportForm() {
        return "reportForm";
    }

    @RequestMapping(value = "/paymentSchedule/reportFormAllPayment", method = RequestMethod.GET)
    public String reportFormAllPayment() {
        return "reportFormAllPayment";
    }

    @RequestMapping(value = "/paymentSchedule/plannedPayment", method = RequestMethod.GET)
    public String plannedPayment() {
        return "plannedPayment";
    }

    @RequestMapping(value = "/paymentSchedule/applicationFormation", method = RequestMethod.GET)
    public String executionOfPayments() {
        return "applicationFormation";
    }

    @RequestMapping(value = "/paymentSchedule/paymentConfirmation", method = RequestMethod.GET)
    public String paymentConfirmation() {
        return "paymentConfirmation";
    }

    @RequestMapping("/")
    public RedirectView localRedirect() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("paymentSchedule/");
        return redirectView;
    }
}
