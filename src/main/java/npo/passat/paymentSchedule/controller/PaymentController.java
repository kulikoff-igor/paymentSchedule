package npo.passat.paymentSchedule.controller;

import npo.passat.paymentSchedule.model.PaymentSchedule;
import npo.passat.paymentSchedule.model.User;
import npo.passat.paymentSchedule.model.UserActions;
import npo.passat.paymentSchedule.service.PaymentScheduleService;
import npo.passat.paymentSchedule.service.UserActionsService;
import npo.passat.paymentSchedule.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("paymentSchedule/api")
public class PaymentController {
    @Autowired
    PaymentScheduleService paymentScheduleService;
    @Autowired
    UserService userService;
    @Autowired
    private UserActionsService userActionsService;

    @GetMapping(value = "/getAllPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PaymentSchedule> getAllPaymentSchedule() {
        return paymentScheduleService.getAllPaymentPlanned();
    }

    @GetMapping(value = "/getForDatePaymentPlanned")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PaymentSchedule> getForDatePaymentPlanned(@RequestParam(value = "scheduledDate", required = true) Date scheduledDate) {
        return paymentScheduleService.getForDatePaymentPlanned(scheduledDate.toString());
    }

    @GetMapping(value = "/getForDateUnPaymentPlanned")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PaymentSchedule> getForDateUnPaymentPlanned(@RequestParam(value = "actualDate", required = true) Date actualDate) {
        return paymentScheduleService.getForDateUnPaymentPlanned(actualDate.toString());
    }

    @PostMapping(value = "/addPlannedPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public void addPlannedPayment(@RequestBody PaymentSchedule paymentSchedule, Authentication authentication) {
        userActionsService.addUserActions(new UserActions(new java.util.Date(), authentication.getName(), "Добавление платежа : " + paymentSchedule.toString()));
        paymentScheduleService.addPaymentSchedule(paymentSchedule);
    }

    @PostMapping(value = "/editPlannedPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public void editPlannedPayment(@RequestBody PaymentSchedule paymentSchedule, Authentication authentication) {
        userActionsService.addUserActions(new UserActions(new java.util.Date(), authentication.getName(), "Редактирование платежа : " + paymentSchedule.toString()));
        paymentScheduleService.updatePaymentSchedule(paymentSchedule);
    }

    @GetMapping(value = "/deletePlannedPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public void deletePlannedPayment(@RequestParam(value = "idPaymentSchedule", required = true) Integer idPaymentSchedule, Authentication authentication) {
        userActionsService.addUserActions(new UserActions(new java.util.Date(), authentication.getName(), "Удаление платежа : " + paymentScheduleService.findByIdPaymentPlanned(idPaymentSchedule).toString()));
        paymentScheduleService.deletePaymentSchedule(idPaymentSchedule);
    }

    @PostMapping(value = "/paymentConfirmation")
    @ResponseStatus(value = HttpStatus.OK)
    public void paymentConfirmation(@RequestBody PaymentSchedule paymentSchedule) {

        paymentScheduleService.paymentConfirmation(paymentSchedule);
    }

    @GetMapping(value = "/autocomplete/company")
    @ResponseStatus(value = HttpStatus.OK)
    public List<String> findCompany(@RequestParam(value = "company", required = true) String company) {
        return paymentScheduleService.companyAutocomplete(company);
    }

    @GetMapping(value = "/autocomplete/destinationObject")
    @ResponseStatus(value = HttpStatus.OK)
    public List<String> findDestinationObject(@RequestParam(value = "destinationObject", required = true) String destinationObject) {
        return paymentScheduleService.destinationObjectAutocomplete(destinationObject);
    }

    @GetMapping(value = "/autocomplete/contract")
    @ResponseStatus(value = HttpStatus.OK)
    public List<String> findContract(@RequestParam(value = "contract", required = true) String contract) {
        return paymentScheduleService.contractAutocomplete(contract);
    }

    @GetMapping(value = "/autocomplete/conditions")
    @ResponseStatus(value = HttpStatus.OK)
    public List<String> findConditions(@RequestParam(value = "conditions", required = true) String conditions) {
        return paymentScheduleService.conditionsAutocomplete(conditions);
    }

    @GetMapping(value = "/report/sumCurrency")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportSumCurrency(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportSumCurrency(startDate, finishDate);

    }

    @GetMapping(value = "/report/daySumCurrency")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> dayReportSumCurrency(@RequestParam(value = "dayDate", required = true) String dayDate) {
        return paymentScheduleService.dayReportPayment(dayDate);

    }

    @GetMapping(value = "/report/findPaymentSchedule")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PaymentSchedule> findPaymentSchedule(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportPaymentSchedule(startDate, finishDate);
    }

    @GetMapping(value = "/findNameUser")
    @ResponseStatus(value = HttpStatus.OK)
    public String findNameUser(Authentication authentication) {
        User user = userService.findUserByLogin(authentication.getName());
        return "{\"name\": \"" + user.getName() + "\",\"lastName\": \" " + user.getLastName() + "\"}";
    }

    @GetMapping(value = "/report/userCountActualPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportUserCountActualPayment(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportUserCountActualPayment(startDate, finishDate);
    }

    @GetMapping(value = "/report/userCountPlanetPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportUserCountPlanetPayment(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportUserCountPlanetPayment(startDate, finishDate);
    }

    @GetMapping(value = "/report/allByDatePayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PaymentSchedule> reportAllByDatePayment(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportAllByDatePayment(startDate, finishDate);
    }

    @GetMapping(value = "/report/currencyUrgently")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportCurrencyUrgently(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportCurrencyUrgently(startDate, finishDate);
    }

    @GetMapping(value = "/report/currencyPlanetPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportCurrencyPlanetPayment(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportCurrencyPlanetPayment(startDate, finishDate);
    }

    @GetMapping(value = "/report/currencyActualPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Object> reportCurrencyActualPayment(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "finishDate", required = true) String finishDate) {
        return paymentScheduleService.reportCurrencyActualPayment(startDate, finishDate);
    }

    /*@PostMapping(value = "/editUnPlannedPayment")
    @ResponseStatus(value = HttpStatus.OK)
    public void editUnPlannedPayment(@RequestBody PaymentSchedule paymentSchedule) {
        paymentScheduleService.updatePaymentSchedule(paymentSchedule);
    }*/


}
