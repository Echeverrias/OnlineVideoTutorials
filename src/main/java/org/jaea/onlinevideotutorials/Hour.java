/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import org.jaea.onlinevideotutorials.handlers.OnlineVideoTutorialsHandler;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author juanan
 */
public class Hour {
    
    
    
    private static final Logger log = LoggerFactory
			.getLogger(OnlineVideoTutorialsHandler.class);
    
    public static void printHour(String s){
         //Instanciamos el objeto Calendar
        //en fecha obtenemos la fecha y hora del sistema
        Calendar fecha = new GregorianCalendar();
        //Obtenemos el valor del año, mes, día,
        //hora, minuto y segundo del sistema
        //usando el método get y el parámetro correspondiente
        int año = fecha.get(Calendar.YEAR);
        int mes = fecha.get(Calendar.MONTH);
        int dia = fecha.get(Calendar.DAY_OF_MONTH);
        int hora = fecha.get(Calendar.HOUR_OF_DAY);
        int minuto = fecha.get(Calendar.MINUTE);
        int segundo = fecha.get(Calendar.SECOND);
        log.info("{} Hora Actual: {}:{}:{}",
                                              s,hora, minuto, segundo);   
    }
    
    public static String getTime() {
        
        Calendar  fecha = new GregorianCalendar();
        
        int hora = fecha.get(Calendar.HOUR_OF_DAY);
        int minuto = fecha.get(Calendar.MINUTE);
        int segundo = fecha.get(Calendar.SECOND);
        
        return "Hora actual: " + hora + ":"  + minuto + ":" + segundo;
    }
}
