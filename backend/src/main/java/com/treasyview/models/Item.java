package com.treasyview.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Table(name="items")
public class Item {
   
   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)   
   private Integer id;
   private Integer parent_id;
   
   @NotNull
   @Size(max = 50)
   private String title;
   
   @Size(max = 255)
   private String description;
   
   public Integer getId() {
	   return id;
   }

   public void setId(Integer id) {
	   this.id = id;
   }

   public Integer getParent_id() {
     return parent_id;
   }

   public void setParent_id(Integer parent_id) {
	 this.parent_id = parent_id;
   }
   
   public String getTitle() {
     return title;
   }

   public void setTitle(String title) {
     this.title = title;
   }

   public String getDescription() {
     return description;
   }
   
   public void setDescription(String description) {
     this.description = description;
   }	

}
