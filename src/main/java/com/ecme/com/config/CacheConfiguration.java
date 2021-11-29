package com.ecme.com.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.ecme.com.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.ecme.com.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.ecme.com.domain.User.class.getName());
            createCache(cm, com.ecme.com.domain.Authority.class.getName());
            createCache(cm, com.ecme.com.domain.User.class.getName() + ".authorities");
            createCache(cm, com.ecme.com.domain.Equipo.class.getName());
            createCache(cm, com.ecme.com.domain.CantidadXModelo.class.getName());
            createCache(cm, com.ecme.com.domain.CantidadXUEB.class.getName());
            createCache(cm, com.ecme.com.domain.CantidadXMarca.class.getName());
            createCache(cm, com.ecme.com.domain.AgregadoXChofer.class.getName());
            createCache(cm, com.ecme.com.domain.LUBRICANTEXTIPO.class.getName());
            createCache(cm, com.ecme.com.domain.LUBRICANTEXUEB.class.getName());
            createCache(cm, com.ecme.com.domain.COMBUSTIBLEXUEB.class.getName());
            createCache(cm, com.ecme.com.domain.CANTIDADXTIPOUEB.class.getName());
            createCache(cm, com.ecme.com.domain.CANTIDADXTIPO.class.getName());
            createCache(cm, com.ecme.com.domain.ENTREGAXTIPO.class.getName());
            createCache(cm, com.ecme.com.domain.Recurso.class.getName());
            createCache(cm, com.ecme.com.domain.Recurso.class.getName() + ".asignacions");
            createCache(cm, com.ecme.com.domain.Asignacion.class.getName());
            createCache(cm, com.ecme.com.domain.Chofer.class.getName());
            createCache(cm, com.ecme.com.domain.Chofer.class.getName() + ".asignacions");
            createCache(cm, com.ecme.com.domain.Motor.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
