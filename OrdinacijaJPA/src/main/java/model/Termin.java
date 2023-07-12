package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the termin database table.
 * 
 */
@Entity
@NamedQuery(name="Termin.findAll", query="SELECT t FROM Termin t")
public class Termin implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date datum;

	@Temporal(TemporalType.TIMESTAMP)
	private Date vreme;

	//bi-directional many-to-one association to Pacijent
	@ManyToOne
	private Pacijent pacijent;

	public Termin() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDatum() {
		return this.datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public Date getVreme() {
		return this.vreme;
	}

	public void setVreme(Date vreme) {
		this.vreme = vreme;
	}

	public Pacijent getPacijent() {
		return this.pacijent;
	}

	public void setPacijent(Pacijent pacijent) {
		this.pacijent = pacijent;
	}

}