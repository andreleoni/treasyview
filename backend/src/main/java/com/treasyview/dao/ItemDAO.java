package com.treasyview.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.treasyview.models.Item;
import com.treasyview.util.JPAUtil;

public class ItemDAO {
	private static EntityManager em = new JPAUtil().getEntityManager();
	
	public static List<Item> findAllWithHierarchy() {
       List<Item> items = em.createQuery("FROM Item").getResultList();
       em.close();
       
       return items;           	   
	}
	
	public static Item create(Item item) {		
       startTransaction();
       
       em.persist(item);
       
       em.getTransaction().commit();
	   em.close();
       
       return item;
	}	
	
	public static Item update(int itemId, String title, String description) {	   		  
	   startTransaction();
	   
	   Item item = em.find(Item.class, itemId);
	   item.setTitle(title);
	   item.setDescription(description);
	   
	   em.getTransaction().commit();
	   em.close();
	   
	   return item;
	}
	
	public static void delete(int itemId) {
	   startTransaction();
		   
	   Item item = em.find(Item.class, itemId);
	   em.remove(item);
	   
	   em.getTransaction().commit();
	   em.close();	   
	}
	
	private static void startTransaction() {
		em.getTransaction().begin();
	}
}
