package npo.passat.paymentSchedule.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@EnableAutoConfiguration
@EnableWebSecurity
@ComponentScan
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private DataSource dataSource;

    @Value("${spring.queries.users-query}")
    private String usersQuery;

    @Value("${spring.queries.roles-query}")
    private String rolesQuery;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {

        auth.
                jdbcAuthentication()
                .usersByUsernameQuery(usersQuery)
                .authoritiesByUsernameQuery(rolesQuery)
                .dataSource(dataSource)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                authorizeRequests()
                .antMatchers("/paymentSchedule/login").permitAll()
                .antMatchers("/paymentSchedule/register").hasAuthority("ADMIN")
                .antMatchers("/paymentSchedule/").hasAuthority("OMTS")
                .antMatchers("/paymentSchedule/plannedPayment").hasAuthority("OMTS")
                .antMatchers("/paymentSchedule/applicationFormation").hasAuthority("OMTS")
                .antMatchers("/paymentSchedule/paymentConfirmation").hasAuthority("OMTS")
                .antMatchers("/paymentSchedule/reportForm").hasAuthority("REPORT")
                .antMatchers("/paymentSchedule/reportFormAllPayment").hasAuthority("REPORT").anyRequest()
                .authenticated().and().csrf().disable().formLogin()
                .loginPage("/paymentSchedule/login").failureUrl("/paymentSchedule/login?error=true")
                .defaultSuccessUrl("/paymentSchedule/")
                .usernameParameter("login")
                .passwordParameter("password")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/paymentSchedule/login").and().exceptionHandling()
                .accessDeniedPage("/paymentSchedule/404");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/vendor/**", "/js/**", "/images/**");
    }
}
