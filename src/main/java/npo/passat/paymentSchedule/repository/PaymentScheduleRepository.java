package npo.passat.paymentSchedule.repository;

import npo.passat.paymentSchedule.model.PaymentSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.sql.Array;
import java.sql.Date;
import java.util.List;

@Repository("PaymentScheduleRepository")
public interface PaymentScheduleRepository extends JpaRepository<PaymentSchedule, Integer> {
    @Nullable
    List<PaymentSchedule> findAllByActualDateIsNull();

    @Nullable
    PaymentSchedule findByIdPaymentSchedule(Integer idPaymentScheduleId);

    @Nullable
    @Query(value = "SELECT  payment_schedule.* FROM payment_schedule WHERE payment_schedule.actual_date = :actualDate AND payment_schedule.scheduled_date IS NULL", nativeQuery = true)
    List<PaymentSchedule> findByActualDateAndScheduledDateIsNull(@Param("actualDate") String actualDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.* FROM payment_schedule WHERE payment_schedule.actual_date IS NULL AND payment_schedule.scheduled_date = :scheduledDate", nativeQuery = true)
    List<PaymentSchedule> findByActualDateIsNullAndScheduledDate(@Param("scheduledDate") String scheduledDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.company FROM payment_schedule WHERE payment_schedule.company LIKE %:company% GROUP BY payment_schedule.company", nativeQuery = true)
    List<String> findByCompanyAutocomplete(@Param("company") String company);

    @Nullable
    @Query(value = "SELECT  payment_schedule.destination_object FROM payment_schedule WHERE payment_schedule.destination_object LIKE %:destinationObject% GROUP BY payment_schedule.destination_object", nativeQuery = true)
    List<String> findByDestinationObjectAutocomplete(@Param("destinationObject") String destinationObject);

    @Nullable
    @Query(value = "SELECT  payment_schedule.contract FROM payment_schedule WHERE payment_schedule.contract LIKE %:contract% GROUP BY payment_schedule.contract", nativeQuery = true)
    List<String> findByContractAutocomplete(@Param("contract") String contract);

    @Nullable
    @Query(value = "SELECT  payment_schedule.conditions FROM payment_schedule WHERE payment_schedule.conditions LIKE %:conditions% GROUP BY payment_schedule.conditions", nativeQuery = true)
    List<String> findByConditionsAutocomplete(@Param("conditions") String conditions);

    @Nullable
    @Query(value = "SELECT  payment_schedule.currency,  ROUND(SUM(payment_schedule.amount),2) AS expr1 FROM payment_schedule WHERE payment_schedule.scheduled_date BETWEEN :startDate AND :finishDate GROUP BY payment_schedule.currency", nativeQuery = true)
    List<Object> reportSumCurrency(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.currency,  ROUND(SUM(payment_schedule.amount),2) AS expr1 FROM payment_schedule WHERE payment_schedule.scheduled_date = :dateDay OR payment_schedule.actual_date = :dateDay GROUP BY payment_schedule.currency", nativeQuery = true)
    List<Object> dayReportSumCurrency(@Param("dateDay") String dateDay);

    @Nullable
    @Query(value = "SELECT payment_schedule.* FROM payment_schedule WHERE payment_schedule.scheduled_date BETWEEN :startDate AND :finishDate ", nativeQuery = true)
    List<PaymentSchedule> reportPaymentSchedule(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.user,payment_schedule.scheduled_date,  COUNT(*) AS expr1 FROM payment_schedule WHERE payment_schedule.scheduled_date BETWEEN  :startDate AND :finishDate GROUP BY payment_schedule.user,payment_schedule.scheduled_date ORDER BY payment_schedule.scheduled_date", nativeQuery = true)
    List<Object> reportUserCountPlanetPayment(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.user,payment_schedule.actual_date,  COUNT(*) AS expr1 FROM payment_schedule WHERE payment_schedule.actual_date BETWEEN  :startDate AND :finishDate GROUP BY payment_schedule.user,payment_schedule.actual_date ORDER BY payment_schedule.actual_date", nativeQuery = true)
    List<Object> reportUserCountActualPayment(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.* FROM payment_schedule WHERE payment_schedule.actual_date BETWEEN  :startDate AND :finishDate OR payment_schedule.scheduled_date BETWEEN   :startDate AND :finishDate", nativeQuery = true)
    List<PaymentSchedule> reportAllByDatePayment(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.currency,  ROUND(SUM(payment_schedule.amount),2) AS expr1 FROM payment_schedule WHERE payment_schedule.conditions LIKE 'срочно%' AND   payment_schedule.actual_date BETWEEN  :startDate AND :finishDate GROUP BY payment_schedule.currency", nativeQuery = true)
    List<Object> reportCurrencyUrgently(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.currency,  ROUND(SUM(payment_schedule.amount),2) AS expr1 FROM payment_schedule WHERE payment_schedule.scheduled_date BETWEEN :startDate AND :finishDate GROUP BY payment_schedule.currency", nativeQuery = true)
    List<Object> reportCurrencyPlanetPayment(@Param("startDate") String startDate,@Param("finishDate") String finishDate);

    @Nullable
    @Query(value = "SELECT  payment_schedule.currency,  ROUND(SUM(payment_schedule.amount),2) AS expr1 FROM payment_schedule WHERE payment_schedule.conditions NOT LIKE 'срочно%' AND payment_schedule.actual_date BETWEEN :startDate AND :finishDate GROUP BY payment_schedule.currency", nativeQuery = true)
    List<Object> reportCurrencyActualPayment(@Param("startDate") String startDate,@Param("finishDate") String finishDate);
}
