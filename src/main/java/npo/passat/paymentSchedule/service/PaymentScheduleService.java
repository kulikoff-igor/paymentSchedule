package npo.passat.paymentSchedule.service;

import npo.passat.paymentSchedule.model.PaymentSchedule;
import npo.passat.paymentSchedule.repository.PaymentScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.sql.Date;
import java.util.List;

@Service("PaymentScheduleService")
public class PaymentScheduleService {
    @Autowired
    private PaymentScheduleRepository scheduleRepository;

    public List<PaymentSchedule> getAllPaymentPlanned() {
        return scheduleRepository.findAllByActualDateIsNull();
    }

    public PaymentSchedule findByIdPaymentPlanned(Integer id) {
        return scheduleRepository.findByIdPaymentSchedule(id);
    }

    public List<PaymentSchedule> getForDatePaymentPlanned(String scheduledDate) {
        return scheduleRepository.findByActualDateIsNullAndScheduledDate(scheduledDate);
    }

    public List<PaymentSchedule> getForDateUnPaymentPlanned(String actualDate) {
        return scheduleRepository.findByActualDateAndScheduledDateIsNull(actualDate.toString());
    }

    public void addPaymentSchedule(PaymentSchedule paymentSchedule) {
        scheduleRepository.saveAndFlush(paymentSchedule);

    }

    public void updatePaymentSchedule(PaymentSchedule paymentSchedule) {
        PaymentSchedule oldDataPayment = scheduleRepository.findByIdPaymentSchedule(paymentSchedule.getIdPaymentSchedule());
        paymentSchedule.setActualAmount(oldDataPayment.getActualAmount());
        paymentSchedule.setPaid(oldDataPayment.getPaid());
        scheduleRepository.saveAndFlush(paymentSchedule);
    }

    public void paymentConfirmation(PaymentSchedule paymentSchedule) {
        PaymentSchedule oldDataPayment = scheduleRepository.findByIdPaymentSchedule(paymentSchedule.getIdPaymentSchedule());
        paymentSchedule.setCompany(oldDataPayment.getCompany());
        paymentSchedule.setDestinationObject(oldDataPayment.getDestinationObject());
        paymentSchedule.setContract(oldDataPayment.getContract());
        paymentSchedule.setAmount(oldDataPayment.getAmount());
        paymentSchedule.setCurrency(oldDataPayment.getCurrency());
        paymentSchedule.setConditions(oldDataPayment.getConditions());
        paymentSchedule.setScheduledDate(oldDataPayment.getScheduledDate());
        paymentSchedule.setActualDate(oldDataPayment.getActualDate());
        paymentSchedule.setUser(oldDataPayment.getUser());
        scheduleRepository.saveAndFlush(paymentSchedule);
    }

    public void deletePaymentSchedule(Integer idPaymentSchedule) {
        scheduleRepository.deleteById(idPaymentSchedule);
    }

    public List<String> companyAutocomplete(String company) {
        return scheduleRepository.findByCompanyAutocomplete(company);
    }

    public List<String> destinationObjectAutocomplete(String destinationObject) {
        return scheduleRepository.findByDestinationObjectAutocomplete(destinationObject);
    }

    public List<String> contractAutocomplete(String contract) {
        return scheduleRepository.findByContractAutocomplete(contract);
    }

    public List<String> conditionsAutocomplete(String conditions) {
        return scheduleRepository.findByConditionsAutocomplete(conditions);
    }

    public List<Object> reportSumCurrency(String startDate, String finishDate) {
        return scheduleRepository.reportSumCurrency(startDate, finishDate);
    }

    public List<Object> reportCurrencyUrgently(String startDate, String finishDate) {
        return scheduleRepository.reportCurrencyUrgently(startDate, finishDate);
    }
    public List<Object> reportCurrencyPlanetPayment(String startDate, String finishDate) {
        return scheduleRepository.reportCurrencyPlanetPayment(startDate, finishDate);
    }
    public List<Object> reportCurrencyActualPayment(String startDate, String finishDate) {
        return scheduleRepository.reportCurrencyActualPayment(startDate, finishDate);
    }

    public List<PaymentSchedule> reportPaymentSchedule(String startDate, String finishDate) {
        return scheduleRepository.reportPaymentSchedule(startDate, finishDate);
    }

    public List<Object> dayReportPayment(String dateDay) {
        return scheduleRepository.dayReportSumCurrency(dateDay);
    }

    public List<Object> reportUserCountActualPayment(String startDate, String finishDate) {
        return scheduleRepository.reportUserCountActualPayment(startDate, finishDate);
    }

    public List<Object> reportUserCountPlanetPayment(String startDate, String finishDate) {
        return scheduleRepository.reportUserCountPlanetPayment(startDate, finishDate);
    }

    public List<PaymentSchedule> reportAllByDatePayment(String startDate, String finishDate) {
        return scheduleRepository.reportAllByDatePayment(startDate, finishDate);
    }
}
